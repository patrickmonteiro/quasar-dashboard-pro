<template>
  <q-page class="bg-secondary" padding>
    <div class="column items-center q-pt-md">
      <div class="col">
        <div v-for="(audio, index) in audios" :key="index">
          <audio controls :src="audio">
          </audio>
        </div>
      </div>
    </div>
    <q-page-sticky
      v-if="btnStop"
      position="bottom-right"
      :offset="[10, 10]"
      style="z-index: 10000">
      <q-btn
        fab
        icon="mdi-stop-circle-outline"
        color="negative"
        @click="stop()" />
    </q-page-sticky>

    <q-footer>
      <q-toolbar class="bg-secondary row justify-center">
        <q-btn
          class=" q-mb-md col-md-4 col-sm-12 col-xs-10"
          color="primary"
          push
          size="lg"
          icon="mic"
          @click="record()">
            press to record
          </q-btn>
      </q-toolbar>
    </q-footer>
  </q-page>
</template>

<script>
import { QSpinnerBars } from 'quasar'
export default {
  name: 'PageIndex',
  data () {
    return {
      mediaRecorder: null,
      chunks: [],
      audios: [],
      btnStop: false
    }
  },
  mounted () {
    this.init()
  },
  methods: {
    init () {
      if (navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices.getUserMedia({ audio: true })
          .then((stream) => {
            this.mediaRecorder = new MediaRecorder(stream)
            this.mediaRecorder.ondataavailable = (e) => {
              this.chunks.push(e.data)
            }
            this.mediaRecorder.onstop = (e) => {
              const blob = new Blob(this.chunks, { type: 'audio/ogg; codecs=opus' })
              const audioURL = window.URL.createObjectURL(blob)
              this.chunks = []
              this.audios.push(audioURL)
            }
          })
          .catch(function (err) {
            console.log('The following getUserMedia error occured: ' + err)
          })
      } else {
        alert('getUserMedia not supported on your browser!')
      }
    },
    record () {
      this.mediaRecorder.start()
      this.$q.loading.show({
        spinner: QSpinnerBars,
        spinnerColor: 'white',
        backgroundColor: 'primary'
      })
      this.btnStop = true
    },
    stop () {
      this.mediaRecorder.stop()
      this.$q.loading.hide()
      this.btnStop = false
    }
  }
}
</script>
