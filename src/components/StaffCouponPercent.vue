<template>
  <VueApexCharts       class="animate__animated animate__fadeIn" width="500" type="radialBar" :options="options" :series="series"></VueApexCharts>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue'
import { getCssVar } from 'quasar'
import VueApexCharts from 'vue3-apexcharts'
import { supabase } from '../boot/supabase'

const loadingState = ref(true)
const stuffData = ref([])
const percentagePeopleWithCouponRights = ref(0)

onMounted(() => {
  handleRequest()
})

const handleRequest = async () => {
  try {
    let { data, error } = await supabase.from('staff').select('*')
    stuffData.value = data
    loadingState.value = false
    if (error) throw error
  } catch (error) {
    if (error instanceof Error) {
      alert(error.message)
    }
  }
}

watch(stuffData, newStuffData => {
  if (newStuffData.length > 0) {
    const numberOfPeopleWithCouponRights = newStuffData.filter(
      person => person.coupon_rights
    ).length

    percentagePeopleWithCouponRights.value = (
      (numberOfPeopleWithCouponRights / newStuffData.length) *
      100
    ).toFixed(2)

    // Update the data in the series
    series.value = [percentagePeopleWithCouponRights.value]
  }
})

const options = ref({
  chart: {
    height: 300,
    type: 'radialBar',
    sparkline: {
      enabled: true
    }
  },
  title: {
    text: `Προσωπικό με κουπόνια`,
    align: 'center'
  },
  colors: [getCssVar('secondary')],
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
  labels: ['Μέσος όρος']
})

const series = ref([percentagePeopleWithCouponRights.value])
</script>
