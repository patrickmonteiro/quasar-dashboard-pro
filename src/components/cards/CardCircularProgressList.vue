<template>
<div class="row q-pt-md q-col-gutter-lg">
  <div
    v-for="(progress, index) in progressList"
    :key="index"
    class="col-md-3 col-sm-12 col-xs-12 text-center"
  >
    <card-circular-progress
      :bg-color="progress.bgColor"
      :amount="progress.amount"
    />
  </div>
</div>
</template>

<script>
import { colors } from 'quasar'
const { getBrand } = colors
export default {
  name: 'CardCircularProgressList',
  components: {
    CardCircularProgress: () => import('components/cards/CardCircularProgress')
  },
  props: {
    bgColor: {
      type: String,
      default: 'bg-primary'
    },
    color: {
      type: String,
      default: 'white'
    }
  },
  data () {
    return {
      progressList: [
        {
          bgColor: getBrand('positive'),
          amount: 75
        },
        {
          bgColor: getBrand('info'),
          amount: 30
        },
        {
          bgColor: getBrand('warning'),
          amount: 46
        },
        {
          bgColor: getBrand('negative'),
          amount: 93
        }
      ]
    }
  }
}
</script>
