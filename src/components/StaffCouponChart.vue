<template>
  <q-card class="relative-position card-animation" bordered>
    <q-card-section>
      <transition appear enter-active-class="animated fadeIn" leave-active-class="animated fadeOut">
        <VueApexCharts
          class="animate__animated animate__fadeIn"
          width="400"
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
      align: 'center'
    },
    chart: {
      id: 'apex-donut'
    },
    colors: [getCssVar('primary'), getCssVar('negative')],
    markers: {
      size: 4,
      hover: {
        sizeOffset: 6
      }
    },
    labels: [i18n.t('withCoupon'), i18n.t('withoutCoupon')],
    plotOptions: {
      pie: {
        donut: {
          labels: {
            show: true,
            total: {
              show: true,
              showAlways: true,
              label: i18n.t('total'),
              fontSize: '20px',
              fontWeight: 600,
              color: '#373d3f',
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
  opacity: 65%;
  cursor: pointer;
}

.card-animation:hover {
  opacity: 100%;
  transition: opacity 1s;
}
</style>
