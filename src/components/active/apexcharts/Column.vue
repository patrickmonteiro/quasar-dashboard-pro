<template>
  <transition
    enter-active-class="animated fadeIn"
  >
  <apexchart type="bar" height="320" :options="chartOptions" :series="series" />
  </transition>
</template>

<script>
import { colors } from 'quasar'
const { getBrand } = colors
export default {
  name: 'ApexColumn',
  data () {
    return {
      series: [{
        name: 'Net Profit',
        data: [44, 55, 57, 56, 61, 58, 63, 60, 66]
      }],
      chartOptions: {
        colors: [getBrand('positive'), getBrand('secondary'), getBrand('primary')],
        animations: {
          enabled: true,
          easing: 'easeinout',
          speed: 1000
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
        title: {
          text: 'Column',
          align: 'left',
          style: {
            color: '#111'
          }
        },
        fill: {
          type: 'gradient',
          gradient: {
            shade: 'dark',
            type: 'vertical',
            shadeIntensity: 0.5,
            inverseColors: false,
            opacityFrom: 1,
            opacityTo: 0.8,
            stops: [0, 100]
          }
        },
        dataLabels: {
          enabled: false
        },
        stroke: {
          width: 0
        },
        xaxis: {
          categories: ['Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'],
          labels: {
            style: {
              colors: '#111'
            }
          }
        },
        yaxis: {
          title: {
            text: '$ (thousands)',
            style: {
              color: '#111'
            }
          },
          labels: {
            style: {
              colors: '#111'
            }
          }
        },
        tooltip: {
          y: {
            formatter: function (val) {
              return '$ ' + val + ' thousands'
            }
          }
        }
      }
    }
  }
}
</script>
