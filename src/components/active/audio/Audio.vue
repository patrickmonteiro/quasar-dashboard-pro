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
        type="audio"
        :sources="sources"
        :color="color"
        :background-color="backgroundColor"
        :dark="dark"
        :dense="dense"
        :hide-volume-slider="hideVolumeSlider"
      />
    </q-card-section>
  </q-card>
</template>

<script>
export default {
  name: 'AudioComponent',
  props: {
    color: {
      type: String,
      required: false,
      default: 'white'
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
          src: 'https://raw.githubusercontent.com/quasarframework/quasar-ui-qmediaplayer/dev/demo/public/media/Scott_Holmes_-_04_-_Upbeat_Party.mp3',
          type: 'audio/mp3'
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
