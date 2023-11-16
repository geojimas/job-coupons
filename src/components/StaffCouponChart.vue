<template>
  <q-card class="relative-position card-animation">
    <q-card-section>
      <transition appear enter-active-class="animated fadeIn" leave-active-class="animated fadeOut">
        <VueApexCharts
          class="animate__animated animate__fadeIn"
          width="370"
          type="donut"
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
  numberOfPeopleWithCouponRightsValue: {
    type: Number,
    required: true
  },
  numberOfPeopleWithoutCouponRightsValue: {
    type: Number,
    required: true
  },
  loadingState: {
    type: Boolean,
    required: true
  }
})

const options = computed(() => {
  return {
    title: {
      text: i18n.t('staffCoupon'),
      align: 'left',
      style: {
        color: getCssVar('positive')
      }
    },
    chart: {
      id: 'apex-donut'
    },
    dataLabels: {
      enabled: true,
      textAnchor: 'middle',
      distributed: false,
      offsetX: 0,
      offsetY: 0,
      style: {
        fontSize: '14px',
        fontWeight: 'bold',
        colors: ['black']
      },
      background: {
        enabled: true,
        foreColor: '#fff',
        padding: 4,
        borderRadius: 2,
        borderWidth: 1,
        borderColor: '#fff',
        opacity: 0.9,
        dropShadow: {
          enabled: false,
          top: 1,
          left: 1,
          blur: 1,
          color: '#000',
          opacity: 0.45
        }
      },
    },
    colors: [getCssVar('positive'), getCssVar('negative')],
    labels: [i18n.t('withCoupon'), i18n.t('withoutCoupon')],
    plotOptions: {
      pie: {
        donut: {
          size: '60%',
          background: 'transparent',
          labels: {
            show: true,
            value: {
              show: true,
              fontSize: '20px',
              fontWeight: 600,
              color: getCssVar('positive'),
              formatter: function (val) {
                return val
              }
            },
            total: {
              show: true,
              showAlways: true,
              label: i18n.t('total'),
              fontSize: '20px',
              fontWeight: 600,
              color: getCssVar('positive'),
              formatter: function (w) {
                return w.globals.seriesTotals.reduce((a, b) => {
                  return a + b
                }, 0)
              }
            }
          }
        }
      }
    }
  }
})
const series = computed(() => {
  return [props.numberOfPeopleWithCouponRightsValue, props.numberOfPeopleWithoutCouponRightsValue]
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
