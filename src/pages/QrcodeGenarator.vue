<template>
  <q-page class="bg-secondary" padding>
    <div class="row justify-center">
      <div class="col-12 q-pt-lg text-center text-blue-grey-9">
        <span class="text-subtitle1">
          Enter the String you want to insert into your custom QRCode.
        </span>
      </div>
      <div class="col-md-6 col-sm-12 col-xs-12 q-pt-lg">
        <q-input outlined class="bg-white"  v-model="text" label="Value" />
      </div>
      <div class="col-12 q-py-md text-center">
        <qriously :value="text" :size="230" />
      </div>
      <div class="col-md-4 col-xs-12 col-sm-12">
        <q-btn
          color="dark"
          size="lg"
          rounded
          label="Donwload"
          class="full-width col-6"
          @click="donwloadCanvas"
        />
      </div>
    </div>
  </q-page>
</template>

<script>
export default {
  name: 'Generator',
  data () {
    return {
      text: 'https://github.com/patrickmonteiro'
    }
  },
  methods: {
    donwloadCanvas () {
      const canvas = document.getElementsByTagName('canvas')
      const link = document.createElement('a')
      link.download = 'QRCode.png'
      link.href = canvas[0].toDataURL()
      link.click()
    }
  }
}
</script>
