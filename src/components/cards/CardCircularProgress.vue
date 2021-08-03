<template>
  <q-card bordered class="fit" :style="`background: ${bgColor}`">
    <q-card-section class="q-pb-xs">
      <div class="text-h6 text-white">Quasar developers</div>
    </q-card-section>
    <q-separator />
    <q-card-section class="">
      <q-circular-progress
        show-value
        class="text-white q-ma-md"
        :value="amount"
        size="90px"
        :thickness="0.3"
        :color="color"
        track-color="grey-5"
      />
    </q-card-section>
  </q-card>
</template>

<script>
export default {
  name: 'CardColumnChart',
  props: {
    bgColor: {
      type: String,
      default: 'bg-primary'
    },
    color: {
      type: String,
      default: 'white'
    },
    amount: {
      type: Number,
      default: 0,
      required: true
    }
  },
  components: {
    // ApexColumn: () => import('components/active/apexcharts/Column')
  }
}
</script>
