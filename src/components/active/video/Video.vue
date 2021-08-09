<template>
  <!-- <div style="max-width: 800px; width: 100%;">
  </div> -->
  <q-card bordered class="fit">
    <q-card-section class="q-pb-xs">
      <div class="text-h6">{{ title }}</div>
    </q-card-section>
    <q-separator />
    <q-card-section class="">
      <q-media-player
        type="video"
        :sources="sources"
        :color="color"
        :background-color="backgroundColor"
        :dark="dark"
        :dense="dense"
        :hide-volume-slider="hideVolumeSlider"
        mobile-mode
        :big-play-button-color="color"
        :poster="poster"
      />
    </q-card-section>
  </q-card>
</template>

<script>
export default {
  name: 'VideoComponent',
  props: {
    color: {
      type: String,
      required: false,
      default: 'white'
    },
    poster: {
      type: String,
      required: false,
      default: ''
    },
    title: {
      type: String,
      required: false,
      default: 'Audio'
    },
    backgroundColor: {
      type: String,
      required: false,
      default: 'black'
    },
    dark: {
      type: Boolean,
      required: false,
      default: false
    },
    dense: {
      type: Boolean,
      required: false,
      default: false
    },
    hideVolumeSlider: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  data () {
    return {
      sources: [
        {
          src: 'http://www.peach.themazzone.com/durian/movies/sintel-2048-surround.mp4',
          type: 'video/mp4'
        }
      ]
    }
  },
  mounted () {
  },
  methods: {
  }
}
</script>
