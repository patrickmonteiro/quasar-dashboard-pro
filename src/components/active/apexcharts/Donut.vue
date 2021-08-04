<template>
  <transition
      enter-active-class="animated fadeIn"
    >
    <apexchart type="donut" height="320" :options="chartOptions" :series="series" />
  </transition>
</template>

<script>
import { colors } from 'quasar'
const { getBrand } = colors
export default {
  name: 'ApexDonut',
  data () {
    return {
      series: [44, 55, 41, 17, 15],
      chartOptions: {
        colors: [getBrand('positive'), getBrand('warning'), getBrand('primary'), getBrand('negative'), getBrand('info'), getBrand('blue')],
        animations: {
          enabled: true,
          easing: 'easeinout',
          speed: 1000
        },
        fill: {
          type: 'gradient',
          gradient: {
            shade: 'dark',
            type: 'vertical',
            shadeIntensity: 0.05,
            inverseColors: false,
            opacityFrom: 1,
            opacityTo: 0.9,
            stops: [0, 100]
          }
        },
        chart: {
          toolbar: {
            show: true
          }
        },
        title: {
          text: 'Donut',
          align: 'left',
          style: {
            color: '#111'
          }
        },
        labels: ['Javascript', 'Rust', 'Go', '.Net', 'PHP'],
        responsive: [{
          breakpoint: 480,
          options: {
            chart: {
              width: 250
            },
            legend: {
              position: 'bottom'
            }
          }
        }],
        legend: {
          labels: {
            colors: '#111'
          }
        }
      }
    }
  }
}
</script>
