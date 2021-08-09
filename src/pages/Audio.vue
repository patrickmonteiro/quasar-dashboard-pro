<template>
  <q-page class="bg-secondary" padding>
    <div class="row q-col-gutter-md">
      <div class="col-md-6 col-sm-12 col-xs-12">
        <audio-component
          title="Basic"
        />
      </div>
      <div class="col-md-6 col-sm-12 col-xs-12">
        <audio-component
          title="Custom Color"
          color="amber"
        />
      </div>
      <div class="col-md-6 col-sm-12 col-xs-12">
        <audio-component
          title="Custom Background Color"
          color="amber"
          background-color="positive"
        />
      </div>
      <div class="col-md-6 col-sm-12 col-xs-12">
        <audio-component
          title="Dark Mode"
          background-color="blue-grey-2"
          :dark="true"
        />
      </div>
      <div class="col-md-6 col-sm-12 col-xs-12">
        <audio-component
          title="Dense Mode"
          :dense="true"
        />
      </div>
      <div class="col-md-6 col-sm-12 col-xs-12">
        <audio-component
          title="Hide Volume Slider"
          :hideVolumeSlider="true"
        />
      </div>
    </div>
  </q-page>
</template>

<script>

export default {
  name: 'PageAudio',
  components: {
    AudioComponent: () => import('components/active/audio/Audio')
  }
}
</script>
