<template>
  <transition
    enter-active-class="animated fadeIn"
  >
    <apexchart ref="realtimeChart" type="area" height="320" :options="chartOptions" :series="series" />
  </transition>
</template>

<script>
import { colors } from 'quasar'
const { getBrand } = colors
export default {
  name: 'ApexAreaMultiple',
  data () {
    return {
      series: [
        {
          name: 'Area',
          data: [10, 41, 35, 51, 49, 62, 69, 91, 99]
        },
        {
          name: 'Area 2',
          data: [24, 40, 60, 60, 38, 28, 28, 38, 10]
        }
      ],
      chartOptions: {
        colors: [getBrand('positive'), getBrand('negative'), getBrand('warning')],
        animations: {
          enabled: true,
          easing: 'easeinout',
          speed: 1000
        },
        chart: {
          height: 350,
          type: 'area'
        },
        grid: {
          show: true,
          strokeDashArray: 0,
          xaxis: {
            lines: {
              show: true
            }
          }
        },
        stroke: {
          curve: 'smooth'
        },
        dropShadow: {
          enabled: true,
          opacity: 0.3,
          blur: 5,
          left: -7,
          top: 22
        },
        dataLabels: {
          enabled: false
        },
        title: {
          text: 'Area Multiple',
          align: 'left',
          style: {
            color: '#111'
          }
        },
        xaxis: {
          categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
          labels: {
            style: {
              colors: '#111'
            }
          }
        },
        yaxis: {
          labels: {
            style: {
              colors: '#111'
            }
          }
        }
      }
    }
  },
  mounted () {
    // this.setDataLineChart()
  },
  methods: {
    getRandomArbitrary (min, max) {
      return Math.floor(Math.random() * 99)
    },
    setDataLineChart () {
      setInterval(() => {
        this.series[0].data.splice(0, 1)
        this.series[0].data.push(this.getRandomArbitrary(0, 99))
        this.updateSeriesLine()
      }, 3000)
    },
    updateSeriesLine () {
      this.$refs.realtimeChart.updateSeries([{
        data: this.series[0].data
      }], false, true)
    }
  }
}
</script>
