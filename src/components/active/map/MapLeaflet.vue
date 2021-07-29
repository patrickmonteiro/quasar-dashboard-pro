<template>
  <div v-if="load">
    <map-skeleton :height="height" />
  </div>
  <div v-else>
    <l-map
      v-if="ready"
      :style="`height: calc(${height}vh - 100px)`"
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
</template>

<script>
import L from 'leaflet'
export default {
  name: 'MapLeafletActive',
  props: {
    height: {
      type: Number,
      required: false,
      default: 100
    }
  },
  components: {
    MapSkeleton: () => import('components/skeletons/Map')
  },
  data () {
    return {
      load: true,
      latitude: '',
      longitude: '',
      url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      zoom: 14,
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
          lat: (coords.latitude + 0.0015),
          log: (coords.longitude + 0.0025),
          info: 'Quasar 1'
        },
        {
          lat: (coords.latitude + 0.0018),
          log: (coords.longitude + 0.0028),
          info: 'Quasar 2'
        },
        {
          lat: (coords.latitude + -0.0015),
          log: (coords.longitude + -0.0015),
          info: 'Quasar 3'
        },
        {
          lat: (coords.latitude + 0.0020),
          log: (coords.longitude + -0.0033),
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

<style>

</style>
