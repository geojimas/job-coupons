<template>
  <q-card class="relative-position card-animation" bordered>
    <q-card-section>
      <transition appear enter-active-class="animated fadeIn" leave-active-class="animated fadeOut">
        <VueApexCharts
          class="animate__animated animate__fadeIn"
          width="370"
          type="radialBar"
          :options="options"
          :series="series"></VueApexCharts>
      </transition>
    </q-card-section>
  </q-card>
</template>

<script setup>
import { computed } from 'vue'
import { getCssVar } from 'quasar'
import VueApexCharts from 'vue3-apexcharts'
import { useI18n } from 'vue-i18n'

const i18n = useI18n()

const props = defineProps({
  percentagePeopleWithCouponRights: {
    type: String,
    required: true
  },
  loadingState: {
    type: Boolean,
    required: true
  }
})

const options = computed(() => {
  return {
    chart: {
      height: 300,
      type: 'radialBar',
      sparkline: {
        enabled: true
      }
    },
    title: {
      text: i18n.t('staffWithCoupons'),
      align: 'center',
      style: {
        color: getCssVar('warning'),
      }
    },
    colors: [getCssVar('warning')],
    plotOptions: {
      radialBar: {
        startAngle: -90,
        endAngle: 90,
        track: {
          background: '#e7e7e7',
          strokeWidth: '97%',
          margin: 5, // margin is in pixels
          dropShadow: {
            enabled: true,
            top: 2,
            left: 0,
            color: '#999',
            opacity: 1,
            blur: 2
          }
        },
        dataLabels: {
          name: {
            show: true
          },
          value: {
            show: true,
            color: getCssVar('warning'),
            offsetY: -50,
            fontSize: '25px'
          }
        }
      }
    },
    fill: {
      type: 'gradient',
      gradient: {
        shade: 'light',
        shadeIntensity: 0.4,
        inverseColors: false,
        opacityFrom: 1,
        opacityTo: 1,
        stops: [0, 50, 53, 91]
      }
    },
    labels: [i18n.t('average')]
  }
})

const series = computed(() => {
  return [
    isNaN(props.percentagePeopleWithCouponRights) ? 0 : props.percentagePeopleWithCouponRights
  ]
})
</script>

<style lang="scss" scoped>
.card-animation {
  cursor: pointer;
  &:hover {
    box-shadow: 0 26px 58px 0 rgba(0, 0, 0, 0.22), 0 5px 14px 0 $secondary;
    transition: box-shadow 0.3s;
  }
}
</style>
