<template>
  <q-page class="bg-secondary" padding>
    <div class="row">
      <div
        v-if="!showCamera"
        class="col-12 text-center q-pt-md"
      >
          <img
          alt="Quasar logo"
          src="/qr_code.svg"
          style="width: 340px"
        >
      </div>
    </div>
    <div class="row justify-center q-pt-lg">
       <div class="col-md-6 col-sm-12 col-xs-12 text-center">

        <span class="text-subtitle2 text-grey-9">
          {{ textInfo }}
        </span>

        <q-btn
          v-show="!showCamera"
          color="dark"
          rounded
          icon="mdi-camera"
          label="Read QRCode"
          class="full-width"
          size="lg"
          @click="turnCameraOn()"
        />

        <p class="text-subtitle1" v-if="result">Last result: <b>{{ result }}</b></p>

        <div v-if="showCamera">
          <qrcode-stream :camera="camera" @decode="onDecode">
          </qrcode-stream>

          <q-btn
            color="dark"
            rounded
            outline
            icon="mdi-close-circle"
            label="Cancel"
            size="lg"
            class="full-width q-mt-md"
            @click="turnCameraOff()"
          />
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
import { QrcodeStream } from 'vue-qrcode-reader'
export default {
  name: 'PageQrcode',
  components: { QrcodeStream },
  data () {
    return {
      isValid: undefined,
      camera: 'auto',
      result: null,
      showCamera: false
    }
  },
  computed: {
    textInfo () {
      return this.showCamera ? 'position the qrcode on the camera' : 'Press the button and scan a qrcode.'
    }
  },
  methods: {
    async onDecode (content) {
      this.result = content
      this.turnCameraOff()
    },
    turnCameraOn () {
      this.camera = 'auto'
      this.showCamera = true
    },
    turnCameraOff () {
      this.camera = 'off'
      this.showCamera = false
    }
  }
}
</script>
