<template>
  <q-page class="bg-secondary" padding>
    <div class="row q-col-gutter-md">
      <div class="col-md-6 col-sm-12 col-xs-12">
        <video-component
          title="Basic"
        />
      </div>
      <div class="col-md-6 col-sm-12 col-xs-12">
        <video-component
          title="Custom Color"
          color="amber"
        />
      </div>
      <div class="col-md-6 col-sm-12 col-xs-12">
        <video-component
          title="Custom Background Color"
          color="amber"
          background-color="positive"
        />
      </div>
      <div class="col-md-6 col-sm-12 col-xs-12">
        <video-component
          title="Dark Mode"
          background-color="blue-grey-2"
          :dark="true"
        />
      </div>
      <div class="col-md-6 col-sm-12 col-xs-12">
        <video-component
          title="Dense Mode"
          :dense="true"
        />
      </div>
      <div class="col-md-6 col-sm-12 col-xs-12">
        <video-component
          title="Hide Volume Slider"
          :hideVolumeSlider="true"
        />
      </div>
      <div class="col-md-6 col-sm-12 col-xs-12">
        <video-component
          title="Poster"
          poster='media/nasa.jpg'
        />
      </div>
    </div>
  </q-page>
</template>

<script>

export default {
  name: 'PageVideo',
  components: {
    VideoComponent: () => import('components/active/video/Video')
  }
}
</script>
